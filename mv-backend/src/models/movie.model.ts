import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "movies", // Define the table name for the Movie model
})
export default class Movie extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  id?: number; // Define the property to store the ID

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "title",
  })
  title?: string; // Define the property to store the title

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "description",
  })
  description?: string; // Define the property to store the description

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "duration", // in minutes
  })
  duration?: number; // Define the property to store the duration

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "release_year",
  })
  releaseYear?: String; // Define the property to store the release year

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: "rating",
    defaultValue: 0,
    validate: {
      min: {
        args: [0], // Minimum value allowed for the rating column
        msg: "Rating must be at least 0", // Custom error message if validation fails
      },
      max: {
        args: [5], // Maximum value allowed for the rating column
        msg: "Rating must not exceed 10", // Custom error message if validation fails
      },
    },
  })
  rating?: number; // Define the property to store the rating

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
    field: "likes",
  })
  likes?: number; // Define the property to store the number of likes

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0, // Default value is 0
    field: "dislikes",
  })
  dislikes?: number; // Define the property to store the number of dislikes
}
