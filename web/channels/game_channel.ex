defmodule PictureThis.GameChannel do
  use Phoenix.Channel
  import Ecto.Query
  alias PictureThis.Game
  alias PictureThis.Message
  alias PictureThis.Repo

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> game_code, _message, socket) do
    messages =
      Game
      |> where(code: ^game_code)
      |> preload(:messages)
      |> Repo.one
      |> Map.get(:messages)
      |> Enum.map(fn(message) -> Map.delete(message, :game) end)

    {:ok, messages, socket}
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

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end
end