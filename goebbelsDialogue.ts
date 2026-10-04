export type Gender = 'm' | 'f';

// Handles both {мужской|женский} and optional suffixes like {а|} or {|а}.
export function genderReply(gender: Gender, text: string): string {
  return text.replace(/\{([^{}]*)\|([^{}]*)\}/g, (_, opt1: string, opt2: string) => {
    // If one of the options is empty (e.g. {а|} or {|а}):
    if (opt1 && !opt2) {
      // {а|} -> 'а' for female, '' for male
      return gender === 'f' ? opt1 : '';
    }
    if (!opt1 && opt2) {
      // {|а} -> 'а' for female, '' for male
      return gender === 'f' ? opt2 : '';
    }
    // Full words e.g. {был|была}, {ся|ась}, {самому|самой} -> opt1 is male, opt2 is female
    return gender === 'f' ? opt2 : opt1;
  });
}
