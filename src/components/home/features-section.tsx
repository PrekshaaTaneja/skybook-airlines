import {
  Plane,
  CalendarClock,
  ShieldCheck,
} from "lucide-react";

import Container from "../shared/container";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Realtime Seat Selection",
    description:
      "Select seats instantly with live availability updates powered by realtime sync.",
    icon: Plane,
  },

  {
    title: "Easy Rescheduling",
    description:
      "Change flights effortlessly with transparent fare differences and instant updates.",
    icon: CalendarClock,
  },

  {
    title: "Secure Booking System",
    description:
      "Protected booking architecture with Supabase Auth and Row Level Security.",
    icon: ShieldCheck,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-slate-50 py-24">
      <Container>

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose SkyBook?
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Designed with modern technologies and premium user experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-0 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <CardContent className="p-8">

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                  <feature.icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-600">
                  {feature.description}
                </p>

              </CardContent>
            </Card>
          ))}
        </div>

      </Container>
    </section>
  );
}