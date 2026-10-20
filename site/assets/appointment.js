// This presentation-only form never sends or persists the visitor's details.
const form = document.getElementById("appointment-form");
const fields = form.elements;
const preview = document.getElementById("appointment-preview");
const summary = document.getElementById("appointment-summary");
const dateFormatter = new Intl.DateTimeFormat("el-GR", { dateStyle: "long" });

function today() {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Athens", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  const part = type => parts.find(item => item.type === type).value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

fields.date.min = today();
const requestedTopic = new URLSearchParams(window.location.search).get("topic");
if ([...fields.topic.options].some(option => option.value === requestedTopic)) {
  fields.topic.value = requestedTopic;
}

function clearPreview() {
  preview.hidden = true;
  summary.replaceChildren();
}
form.addEventListener("input", event => {
  event.target.setCustomValidity?.("");
  clearPreview();
});
form.addEventListener("change", clearPreview);
form.addEventListener("submit", event => {
  event.preventDefault();
  clearPreview();
  fields.date.min = today();
  fields.fullName.value = fields.fullName.value.trim();
  fields.phone.value = fields.phone.value.trim();
  fields.email.value = fields.email.value.trim();
  fields.fullName.setCustomValidity(fields.fullName.value ? "" : "Συμπλήρωσε το ονοματεπώνυμό σου.");
  const digits = fields.phone.value.replace(/\D/g, "");
  const validPhone = /^[+\d\s().-]+$/.test(fields.phone.value) && digits.length >= 7 && digits.length <= 15;
  fields.phone.setCustomValidity(validPhone ? "" : "Συμπλήρωσε έναν έγκυρο αριθμό τηλεφώνου.");
  fields.date.setCustomValidity(fields.date.value && fields.date.value < fields.date.min
    ? "Επίλεξε τη σημερινή ή μια μελλοντική ημέρα." : "");
  if (!form.reportValidity()) return;

  const date = fields.date.value
    ? dateFormatter.format(new Date(`${fields.date.value}T12:00:00`))
    : "Χωρίς προτίμηση";
  const rows = [
    ["Ονοματεπώνυμο", fields.fullName.value],
    ["Τηλέφωνο", fields.phone.value],
    ["Email", fields.email.value || "Δεν συμπληρώθηκε"],
    ["Θέμα", fields.topic.selectedOptions[0].textContent],
    ["Επιθυμητή ημέρα", date],
    ["Επιθυμητή ώρα", fields.time.value || "Χωρίς προτίμηση"],
    ["Μήνυμα", fields.message.value.trim() || "Δεν συμπληρώθηκε"]
  ];
  for (const [label, value] of rows) {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = value;
    row.append(term, description);
    summary.append(row);
  }
  preview.hidden = false;
  document.getElementById("preview-title").focus();
});
document.getElementById("appointment-edit").addEventListener("click", () => {
  clearPreview();
  fields.fullName.focus();
});
// Enable only after the local preview handler is installed.
document.getElementById("appointment-submit").disabled = false;
