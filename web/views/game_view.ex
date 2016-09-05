defmodule PictureThis.GameView do
  use PictureThis.Web, :view

  def render("index.json", %{games: games}) do
    %{data: render_many(games, PictureThis.GameView, "game.json")}
  end

  def render("show.json", %{game: game}) do
    %{data: render_one(game, PictureThis.GameView, "game.json")}
  end

  def render("game.json", %{game: game}) do
    %{
      id: game.id,
      code: game.code,
      players: game.players,
      in_progress: game.in_progress
    }
  end
end
