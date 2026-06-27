export function withTimestamp(
  _target: object,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const original = descriptor.value;

  descriptor.value = function (message: string) {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const timestamp =
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
      `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    return original.call(this, `[${timestamp}] ${message}`);
  };

  return descriptor;
}

export function uppercase(
  _target: object,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const original = descriptor.value;

  descriptor.value = function (message: string) {
    return original.call(this, message.toUpperCase());
  };

  return descriptor;
}
