defmodule PictureThis.Game do
  use PictureThis.Web, :model

  schema "games" do
    field :code, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:code])
    |> validate_required([:code])
  end
end
