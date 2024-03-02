import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
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
