const mongoose = require("mongoose");

function isValidObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value);
}

function isValidDate(value) {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function cleanString(value, maxLength = 1000) {
  if (typeof value !== "string") return "";

  return value.trim().slice(0, maxLength);
}

function cleanNumber(value, fallback = 0) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return number;
}

function validateFields(fields = []) {
  if (!Array.isArray(fields)) return [];

  return fields
    .filter(field => field && field.label)
    .slice(0, 50)
    .map((field, index) => {
      const label = cleanString(field.label, 80);
      const key = cleanString(field.key, 80) || `field_${index + 1}`;

      const allowedTypes = ["text", "number", "date", "time", "select", "boolean"];
      const type = allowedTypes.includes(field.type) ? field.type : "text";

      return {
        key,
        label,
        type,
        value: field.value ?? "",
        unit: cleanString(field.unit, 30)
      };
    });
}

function validateMilestones(milestones = []) {
  if (!Array.isArray(milestones)) return [];

  return milestones
    .filter(milestone => milestone && milestone.label)
    .slice(0, 100)
    .map(milestone => ({
      label: cleanString(milestone.label, 80),
      description: cleanString(milestone.description, 500),
      unlockAfterMinutes: Math.max(
        1,
        cleanNumber(milestone.unlockAfterMinutes, 1)
      )
    }))
    .sort((a, b) => a.unlockAfterMinutes - b.unlockAfterMinutes);
}

function validateEntryValues(values = []) {
  if (!Array.isArray(values)) return [];

  return values
    .filter(value => value && value.label)
    .slice(0, 50)
    .map((value, index) => ({
      key: cleanString(value.key, 80) || `value_${index + 1}`,
      label: cleanString(value.label, 80),
      value: value.value ?? "",
      unit: cleanString(value.unit, 30)
    }));
}

module.exports = {
  isValidObjectId,
  isValidDate,
  cleanString,
  cleanNumber,
  validateFields,
  validateMilestones,
  validateEntryValues
};