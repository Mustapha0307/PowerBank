export async function POST(request) {
  try {
    const formData = await request.formData();
    const plainData = {};

    // Translate From formData to object
    for (const [key, value] of formData.entries()) {
      plainData[key] = value;
    }

    const body = new URLSearchParams(plainData).toString();

    const response = await fetch(process.env.SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const result = await response.text();
    console.log("✅ Google Script Response:", result);

    return new Response("تم الإرسال بنجاح", { status: 200 });
  } catch (error) {
    console.error("❌ خطأ:", error);
    return new Response("خطأ في الإرسال", { status: 500 });
  }
}
