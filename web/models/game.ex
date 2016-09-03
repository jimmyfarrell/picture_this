defmodule PictureThis.Game do
  use PictureThis.Web, :model

  schema "games" do
    field :code, :string

    has_many :messages, PictureThis.Message
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:code])
    |> unique_constraint(:code)
    |> validate_required([:code])
  end
end
