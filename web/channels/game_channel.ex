defmodule PictureThis.GameChannel do
  use Phoenix.Channel
  import Ecto.Query
  alias PictureThis.Game
  alias PictureThis.Message
  alias PictureThis.Repo

  def join("game:" <> game_code, %{"player" => player}, socket) do
    game = Game |> where(code: ^game_code) |> preload(:messages) |> Repo.one
    players =
      case Map.get(game, :players) do
        nil -> [player]
        current_players -> [player | current_players]
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
    end
  end

  def terminate(_message, socket) do
  end

  def handle_in("new_msg", payload, socket) do
    broadcast! socket, "new_msg", payload
    game = Game |> where(code: ^payload["game_code"]) |> Repo.one
    message =
      (for {key, val} <- payload, into: %{}, do: {String.to_atom(key), val})
      |> Map.delete(:game_code)
      |> Map.put(:game_id, game.id)
    changeset = Message.changeset(%Message{}, message)
    Repo.insert(changeset)
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
