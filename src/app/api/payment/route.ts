import { NextRequest } from "next/server";
import { Payment } from "mercadopago";
import { z } from "zod";
import { client } from "@/mercadopago";
import { buy, buyPresentialCourse, buyRemoteCourse } from "@/_actions/actions";

const paymentSchema = z.object({
  data: z.object({
    id: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  const {
    data: { id },
  } = paymentSchema.parse(await request.json());

  try {
    const payment = await new Payment(client).get({ id });
    const items = payment.additional_info?.items;
    if (payment.status === "approved" && items) {
      if (!payment.metadata) {
        console.warn("Missed metadata");
        return;
      }
      if ("presentialCourseId" in payment.metadata) {
        await buyPresentialCourse(payment.metadata);
      } else if ("remoteCourseId" in payment.metadata) {
        await buyRemoteCourse(payment.metadata);
      } else {
        await buy(items, payment.metadata);
      }
    }
  } catch (error) {
    console.warn(error);
  }

  return Response.json({ success: true });
}
