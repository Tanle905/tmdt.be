import mongoose from "mongoose";

const roleDataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

export const RoleModel = mongoose.model("Role", roleDataSchema);
