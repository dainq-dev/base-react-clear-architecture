/**
 * Logger interface and implementations
 */

export interface Logger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
}

export interface LoggerFactory {
  loggerFor(name: string): Logger;
}

/**
 * Console Logger implementation
 */
export class ConsoleLogger implements Logger {
  constructor(private readonly name: string) {}

  info(message: string, ...args: unknown[]): void {
    console.log(`[${this.name}]`, message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[${this.name}]`, message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(`[${this.name}]`, message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    console.debug(`[${this.name}]`, message, ...args);
  }
}

/**
 * Console Logger Factory
 */
export class ConsoleLoggerFactory implements LoggerFactory {
  loggerFor(name: string): Logger {
    return new ConsoleLogger(name);
  }
}

