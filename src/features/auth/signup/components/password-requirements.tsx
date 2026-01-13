import { CheckCircle2Icon, Circle } from "lucide-react";

type PasswordRequirement = {
  password: string;
};

export function PasswordRequirements({ password }: PasswordRequirement) {
  const requirements = [
    {
      label: "Pelo menos 6 caracteres",
      test: (pw: string) => pw.length >= 6,
    },
    {
      label: "Ao menos uma letra maiúscula",
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: "Ao menos uma letra minúscula",
      test: (pw: string) => /[a-z]/.test(pw),
    },
    {
      label: "Ao menos um número",
      test: (pw: string) => /[0-9]/.test(pw),
    },
  ];

  return (
    <div className="m-4 mx-0">
      <ul className="text-sm space-y-2">
        {requirements.map((req, idx) => {
          const passed = req.test(password);
          return (
            <li key={idx} className="flex items-center gap-2">
              {passed ? (
                <CheckCircle2Icon size={18} className="text-green-600" />
              ) : (
                <Circle size={18} className="text-neutral-400" />
              )}
              <span
                className={passed ? "text-green-600" : "text-muted-foreground"}
              >
                {req.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
