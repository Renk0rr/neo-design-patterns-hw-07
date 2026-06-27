import { IMessageService } from "./IMessageService";

export class RateLimitProxy implements IMessageService {
  private lastSentAt: number | null = null;

  constructor(
    private readonly wrappee: IMessageService,
    private readonly intervalMs: number,
  ) {}

  send(message: string): void {
    const now = Date.now();

    if (this.lastSentAt !== null && now - this.lastSentAt < this.intervalMs) {
      console.log("[RateLimit] skipped");
      return;
    }

    this.lastSentAt = now;
    this.wrappee.send(message);
  }
}

export function createRateLimitProxy(
  wrappee: IMessageService,
  intervalMs: number,
): IMessageService {
  return new RateLimitProxy(wrappee, intervalMs);
}
