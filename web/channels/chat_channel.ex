defmodule PictureThis.ChatChannel do
  use Phoenix.Channel
  import Ecto.Query
  alias PictureThis.Game
  alias PictureThis.Message
  alias PictureThis.Repo

  def join("chat:" <> game_code, _message, socket) do
    game = Game |> Repo.get_by(code: game_code)
    messages =
      Repo.all(
        from message in Message,
        where: message.game_id == ^game.id,
        preload: :game,
        select: [:body, :sender, :timestamp]
      )
    IO.inspect messages
    {:ok, messages, socket}
  end

  def handle_in("new_msg", payload, socket) do
    "chat:" <> game_code = socket.topic
    game = Repo.get_by(Game, code: game_code)
    message_params =
      (for {key, val} <- payload, into: %{}, do: {String.to_atom(key), val})
      |> Map.put(:game_id, game.id)
      |> Map.put_new(:sender, socket.assigns.player)
    changeset = Message.changeset(%Message{}, message_params)
    case Repo.insert(changeset) do
      {:ok, message} ->
        message = Map.take(message, [:body, :sender, :timestamp])
        broadcast!(socket, "new_msg", message)
      _ -> nil
    end
    {:noreply, socket}
  end

  def handle_out("new_msg", payload, socket) do
    push socket, "new_msg", payload
    {:noreply, socket}
  end
end
