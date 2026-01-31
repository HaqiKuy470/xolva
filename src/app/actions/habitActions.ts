"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createHabit(formData: {
  name: string;
  category: string;
  expReward: number;
}) {
  try {
    // 1. Cari user pertama (karena belum ada fitur login)
    let user = await prisma.user.findFirst();
    
    // 2. Kalau database kosong, buat user dummy dulu
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "tester@xolva.com",
          name: "tester123788",
          tier: "FREE"
        }
      });
    }

    // 3. Simpan habit ke database
    await prisma.habit.create({
      data: {
        name: formData.name,
        category: formData.category,
        expReward: formData.expReward,
        userId: user.id, // Pakai ID user yang kita temukan/buat tadi
      }
    });

    revalidatePath("/"); // Update tampilan UI
    return { success: true };
  } catch (error) {
    console.error("Gagal simpan habit:", error);
    return { success: false };
  }
}