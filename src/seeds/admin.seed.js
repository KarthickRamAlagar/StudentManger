import User from "../db/user.collection.js";
import { hashPassword } from "../utils/Auth/password.utils.js";

export const seedAdminUser = async () => {
  try {
    const email = "admin@gmail.com";

    // 1. check admin exists
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log(" Admin already exists");
      return;
    }

    // 2. hash password
    const password_hash = await hashPassword("Admin@123");

    // 3. create admin
    await User.create({
      name: "System Admin",
      email,
      password: password_hash,
      role: "admin",
      status: "active",
      isVerified: true,
    });

    console.log("✅ Admin seeded successfully");
  } catch (error) {
    console.error("❌ Admin seed failed:", error.message);
  }
};
