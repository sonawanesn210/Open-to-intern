import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

const PhoneUtil = PhoneNumberUtil.getInstance();

export const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.startsWith("00") ? phoneNumber.replace("00", "+") : phoneNumber;
    const formatted = PhoneUtil.parseAndKeepRawInput(cleaned);
    return PhoneUtil.format(formatted, PhoneNumberFormat.E164);
}

/**
 * would throw an error if the provided number is invalid
 * @param phoneNumber a valid mobile number
 */
export const validatePhoneNumber = (phoneNumber: string, strict?: boolean) => {
    const formatted = formatPhoneNumber(phoneNumber);
    if (strict) {
        return PhoneUtil.isValidNumber(PhoneUtil.parseAndKeepRawInput(formatted));
    }
    return PhoneUtil.isPossibleNumber(PhoneUtil.parseAndKeepRawInput(formatted));
};
