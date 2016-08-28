defmodule PictureThis.PageController do
  use PictureThis.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
