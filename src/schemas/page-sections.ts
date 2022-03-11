import mongoose from "mongoose";

const pageSectionSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  subtitle: {
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
});

const PageSection =
  mongoose.models?.PageSection ??
  mongoose.model("PageSection", pageSectionSchema, "pagesections");

export default PageSection;
