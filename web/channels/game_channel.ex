defmodule PictureThis.GameChannel do
  use Phoenix.Channel
  import Ecto.Query
  alias PictureThis.Game
  alias PictureThis.Message
  alias PictureThis.Repo

  def join("game:" <> game_code, %{"player" => player}, socket) do
    game = Game |> Repo.get_by(code: game_code) |> Repo.preload(:messages)
    players =
      case Map.get(game, :players) do
        nil -> [player]
        current_players -> [player | current_players]
        _ -> nil
      end
    changeset = Game.changeset(game, %{players: players})
    case Repo.update(changeset) do
      {:ok, game} ->
        messages =
          game
          |> Map.get(:messages)
          |> Enum.map(fn(message) -> Map.delete(message, :game) end)
        {:ok, messages, socket}
      {:error, changeset} ->
        {:error, %{reason: "internal error"}}
      _ -> nil
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

  def handle_in("new_msg", payload, socket) do
    "game:" <> game_code = socket.topic
    game = Game |> Repo.get_by(code: game_code)
    %{"body" => body, "timestamp" => timestamp} = payload
    sender = payload["sender"] || socket.assigns.player
    changeset =
      Message.changeset(
        %Message{},
        %{body: body, timestamp: timestamp, game_id: game.id, sender: sender}
      )
    case Repo.insert(changeset) do
      {:ok, message} -> broadcast! socket, "new_msg", Map.take(message, [:body, :sender, :timestamp])
      _ -> nil
    end
    {:noreply, socket}
  end

  def handle_in("end_game", _payload, socket) do
    broadcast! socket, "end_game", %{}
    {:noreply, socket}
  end

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end

  def handle_out("end_game", _payload, socket) do
    push socket, "end_game", %{}
    {:noreply, socket}
  end
end
