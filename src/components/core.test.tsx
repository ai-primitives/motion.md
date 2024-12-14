import { describe, it, expect } from "vitest"\nimport { render } from "@testing-library/react"\nimport { Intro, Outro } from "./core"\n\ndescribe("Core Components", () => {\n  it("should render Intro component", () => {\n    const { getByText } = render(\n      <Intro title="Welcome" subtitle="Presentation" duration={5} transition="fade">\n        <p>Additional content</p>\n      </Intro>\n    )\n\n    expect(getByText("Welcome")).toBeDefined()\n    expect(getByText("Presentation")).toBeDefined()\n    expect(getByText("Additional content")).toBeDefined()\n  })\n\n  it("should render Outro component", () => {\n    const { getByText } = render(\n      <Outro title="Thank You" subtitle="Questions?" duration={3} transition="slide">\n        <p>Contact info</p>\n      </Outro>\n    )\n\n    expect(getByText("Thank You")).toBeDefined()\n    expect(getByText("Questions?")).toBeDefined()\n    expect(getByText("Contact info")).toBeDefined()\n  })\n})\n
