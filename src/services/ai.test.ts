import { describe, it, expect, vi, beforeEach } from "vitest"\nimport { AIService } from "./ai"\n\nvi.mock("axios", () => ({\n  default: {\n    post: vi.fn().mockImplementation((url) => {\n      if (url.includes("/images/generations")) {\n        return Promise.resolve({\n          data: {\n            data: [{ url: "https://example.com/image.png" }]\n          }\n        })\n      } else if (url.includes("/audio/speech")) {\n        return Promise.resolve({\n          data: Buffer.from("test-audio")\n        })\n      }\n    })\n  }\n}))\n\ndescribe("AIService", () => {\n  let service: AIService\n\n  beforeEach(() => {\n    service = new AIService({ apiKey: "test-key" })\n  })\n\n  it("should generate image", async () => {\n    const result = await service.generateImage("test prompt", {})\n    expect(result).toBe("https://example.com/image.png")\n  })\n\n  it("should generate video", async () => {\n    const result = await service.generateVideo("test prompt", {})\n    expect(result).toBe("https://example.com/image.png")\n  })\n\n  it("should generate voiceover", async () => {\n    const result = await service.generateVoiceover("Hello world", {})\n    expect(Buffer.isBuffer(result)).toBe(true)\n  })\n\n  it("should throw error without API key", async () => {\n    service = new AIService({})\n    await expect(service.generateImage("test", {})).rejects.toThrow("OpenAI API key is required")\n  })\n})