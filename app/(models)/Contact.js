import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb+srv://bonprealexmax:abmpabmp@cluster0.j4n5edy.mongodb.net/ContactApp2");
mongoose.Promise = global.Promise;

const contactSchema = new Schema(
  {
    favorite: Boolean,
    prenom: String,
    nom: String,
    tel: String,
    email: String,
  },
  {
    timestamps: true,
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

console.log(Contact.schema); // Afficher le schéma du modèle dans la console

export default Contact;
