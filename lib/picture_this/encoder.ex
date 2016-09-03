defimpl Poison.Encoder, for: Any do
  def encode(%{__struct__: _} = struct, options) do
    map =
      struct
      |> Map.from_struct
      |> Map.drop([:__meta__, :__struct__])

    Poison.Encoder.Map.encode(map, options)
  end
end
