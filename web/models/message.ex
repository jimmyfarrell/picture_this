defmodule PictureThis.Message do
  use PictureThis.Web, :model

  schema "messages" do
    field :body, :string
    field :sender, :string
    field :timestamp, :string

    belongs_to :game, PictureThis.Game
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:body, :sender, :timestamp, :game_id])
    |> validate_required([:body, :sender, :timestamp, :game_id])
  end
end
