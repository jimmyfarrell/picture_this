defmodule PictureThis.Repo.Migrations.CreateMessage do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :body, :string
      add :sender, :string
      add :timestamp, :string
      add :game_id, references(:games, on_delete: :delete_all)

      timestamps()
    end

  end
end
