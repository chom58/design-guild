import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "ログインが必要です" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: "イベントIDが必要です" },
        { status: 400 }
      );
    }

    // 既に登録済みかチェック
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId: eventId
        }
      }
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "既に参加登録済みです" },
        { status: 400 }
      );
    }

    // イベントの存在確認（WordPressと連携する場合は後で追加）
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      // イベントがDBに存在しない場合は作成
      await prisma.event.create({
        data: { id: eventId }
      });
    }

    // 参加登録
    const registration = await prisma.eventRegistration.create({
      data: {
        userId: session.user.id,
        eventId: eventId,
        status: "confirmed"
      }
    });

    return NextResponse.json({
      message: "イベントへの参加登録が完了しました",
      registration
    });
  } catch (error) {
    console.error("Event registration error:", error);
    return NextResponse.json(
      { error: "参加登録中にエラーが発生しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "ログインが必要です" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { error: "イベントIDが必要です" },
        { status: 400 }
      );
    }

    // 登録を削除
    await prisma.eventRegistration.delete({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId: eventId
        }
      }
    });

    return NextResponse.json({
      message: "参加登録をキャンセルしました"
    });
  } catch (error) {
    console.error("Event unregistration error:", error);
    return NextResponse.json(
      { error: "キャンセル中にエラーが発生しました" },
      { status: 500 }
    );
  }
}