import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "bosco.c.ng@gmail.com",
    subject: `New message from ${name}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return Response.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }

  return Response.json({ success: true });
}
