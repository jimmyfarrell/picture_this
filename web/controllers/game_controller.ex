defmodule PictureThis.GameController do
  use PictureThis.Web, :controller

  alias PictureThis.Game

  def index(conn, _params) do
    games = Repo.all(Game)
    render(conn, "index.json", games: games)
  end

  def create(conn, %{"code" => code}) do
    changeset = Game.changeset(%Game{}, %{code: code})

    case Repo.insert(changeset) do
      {:ok, game} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", game_path(conn, :show, game))
        |> render("show.json", game: game)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(PictureThis.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => code}) do
    game = Repo.get_by!(Game, code: code)
    render(conn, "show.json", game: game)
  end

  def update(conn, %{"id" => code, "game" => game_params}) do
    game = Repo.get!(Game, code)
    changeset = Game.changeset(game, game_params)

    case Repo.update(changeset) do
      {:ok, game} ->
        render(conn, "show.json", game: game)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(PictureThis.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => code}) do
    game = Repo.get_by(Game, code: code)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(game)

    send_resp(conn, :no_content, "")
  end
end
