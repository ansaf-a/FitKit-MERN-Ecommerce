const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

async function createAdmin() {
  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD in .env before running this script");
  }

  await mongoose.connect(process.env.MONGO_URI);
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = await User.findOneAndUpdate(
    { email: ADMIN_EMAIL.toLowerCase() },
    { name: ADMIN_NAME, email: ADMIN_EMAIL.toLowerCase(), password: hashedPassword, role: "admin" },
    { upsert: true, returnDocument: "after", runValidators: true, setDefaultsOnInsert: true },
  );

  console.log(`Admin account ready for ${admin.email}`);
  await mongoose.disconnect();
}

createAdmin().catch(async (error) => {
  console.error("Admin setup failed:", error.message);
  await mongoose.disconnect();
  process.exitCode = 1;
});
