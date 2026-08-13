export class ValidationService {
  static isValidId(id: string): boolean {
    // Matches a standard UUID (e.g., 550e8400-e29b-41d4-a716-446655440000)
    const uuidPattern =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(id);
  }
}
