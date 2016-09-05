defmodule PictureThis.GameChannel do
  use Phoenix.Channel
  alias PictureThis.Game
  alias PictureThis.Repo

  def join("game:" <> game_code, _message, socket) do
    game = Game |> Repo.get_by(code: game_code)
    player = socket.assigns.player
    players =
      case Map.get(game, :players) do
        nil -> [player]
        current_players -> [player | current_players]
      end
    changeset = Game.changeset(game, %{players: players})
    case Repo.update(changeset) do
      {:ok, _game} -> {:ok, socket}
      {:error, _error} -> {:error, %{reason: "internal error"}}
    end
  end

  def terminate(_message, socket) do
    "game:" <> game_code = socket.topic
    game = Game |> Repo.get_by(code: game_code)
    cond do
      game && length(game.players) == 1 -> Repo.delete!(game)
      game ->
        players = List.delete(game.players, socket.assigns.player)
        changeset = Game.changeset(game, %{players: players})
        Repo.update(changeset)
      true -> nil
    end
  end

  def handle_in("end_game", _payload, socket) do
    "game:" <> game_code = socket.topic
    Game |> Repo.get_by!(code: game_code) |> Repo.delete!
    broadcast! socket, "end_game", %{player: socket.assigns.player}
    {:noreply, socket}
  end

  def handle_out("end_game", payload, socket) do
    push socket, "end_game", payload
    {:noreply, socket}
  end
end
