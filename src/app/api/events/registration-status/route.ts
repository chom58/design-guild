import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ registered: false });
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { error: "イベントIDが必要です" },
        { status: 400 }
      );
    }

    const registration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId: eventId
        }
      }
    });

    return NextResponse.json({
      registered: !!registration,
      registration
    });
  } catch (error) {
    console.error("Registration status error:", error);
    return NextResponse.json(
      { error: "ステータス確認中にエラーが発生しました" },
      { status: 500 }
    );
  }
}