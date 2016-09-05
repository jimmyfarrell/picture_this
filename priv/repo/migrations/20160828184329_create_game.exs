defmodule PictureThis.Repo.Migrations.CreateGame do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :code, :string
      add :in_progress, :boolean
      add :players, {:array, :string}

      timestamps()
    end

    create index(:games, [:code], unique: true)
  end
end
