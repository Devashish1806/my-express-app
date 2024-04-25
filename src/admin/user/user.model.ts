export const userSchema = {
  name: String,
  date: {
    type: Date,
    default: Date.now(),
  },
};
