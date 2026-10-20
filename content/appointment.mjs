import { groups, licences, services, phone } from "./pages.mjs";

export function appointmentForm() {
  return `<section class="section appointment-section" id="appointment" aria-labelledby="appointment-title">
    <div class="container appointment-layout">
      <div class="appointment-intro">
        <p class="eyebrow"><span class="yellow-marker"></span>ΑΣ ΓΝΩΡΙΣΤΟΥΜΕ</p>
        <h2 id="appointment-title">Το επόμενο βήμα,<br><span>στο δικό σου πρόγραμμα.</span></h2>
        <p>Επίλεξε το δίπλωμα ή το θέμα που σε ενδιαφέρει και πες μας πότε θα σε εξυπηρετούσε μια συνάντηση.</p>
        <div class="appointment-confirmation" id="appointment-confirmation"><strong>Πρώτα επικοινωνούμε.</strong><p>Τα ραντεβού επιβεβαιώνονται κατόπιν επικοινωνίας με τη σχολή. Η επιλογή ημέρας και ώρας αποτελεί προτίμηση.</p></div>
        <a class="text-link" href="${phone}">Προτιμάς το τηλέφωνο; 210 666 6589 <span aria-hidden="true">↗</span></a>
      </div>
      <div class="appointment-card">
        <div class="demo-notice" id="appointment-demo"><strong>Προσχέδιο φόρμας</strong><p>Δοκίμασε τη φόρμα με ενδεικτικά στοιχεία. Τα στοιχεία δεν αποστέλλονται και δεν πραγματοποιείται κράτηση.</p></div>
        <form id="appointment-form" action="#appointment" method="post" novalidate aria-describedby="appointment-demo appointment-confirmation">
          <p class="form-help">Τα πεδία με * είναι υποχρεωτικά.</p>
          <div class="form-grid">
            <div class="form-field"><label for="appointment-name">Ονοματεπώνυμο *</label><input id="appointment-name" name="fullName" type="text" autocomplete="name" required maxlength="100"></div>
            <div class="form-field"><label for="appointment-phone">Τηλέφωνο *</label><input id="appointment-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="25"></div>
            <div class="form-field form-field-wide"><label for="appointment-email">Email <span>(προαιρετικό)</span></label><input id="appointment-email" name="email" type="email" autocomplete="email" maxlength="150"></div>
            <div class="form-field form-field-wide"><label for="appointment-topic">Για ποιο θέμα θέλεις ραντεβού; *</label>
              <select id="appointment-topic" name="topic" required>
                <option value="">Επίλεξε δίπλωμα ή θέμα</option>
                ${groups.map(group => `<optgroup label="${group.title}">${group.keys.map(key => {
                  const item = licences.find(entry => entry.key === key);
                  return `<option value="${key}">${item.code} — ${item.label}</option>`;
                }).join("")}</optgroup>`).join("")}
                <optgroup label="Υπηρεσίες">${services.map(item => `<option value="service-${item.key}">${item.label}</option>`).join("")}</optgroup>
                <optgroup label="Άλλο θέμα"><option value="general">Γενική ενημέρωση / Δεν έχω αποφασίσει</option><option value="other">Άλλο θέμα</option></optgroup>
              </select>
            </div>
            <div class="form-field"><label for="appointment-date">Επιθυμητή ημέρα <span>(προαιρετικό)</span></label><input id="appointment-date" name="date" type="date" aria-describedby="appointment-preference"></div>
            <div class="form-field"><label for="appointment-time">Επιθυμητή ώρα <span>(προαιρετικό)</span></label><input id="appointment-time" name="time" type="time" aria-describedby="appointment-preference"></div>
            <p id="appointment-preference" class="form-help form-field-wide">Αν δεν γνωρίζεις ακόμη, άφησε την ημέρα και την ώρα κενές. Δεν εμφανίζεται διαθεσιμότητα σε πραγματικό χρόνο.</p>
            <div class="form-field form-field-wide"><label for="appointment-message">Τι θα ήθελες να συζητήσουμε; <span>(προαιρετικό)</span></label><textarea id="appointment-message" name="message" rows="3" maxlength="1000" placeholder="Π.χ. έχω ήδη δίπλωμα B και ενδιαφέρομαι για A2."></textarea></div>
          </div>
          <div class="form-actions"><p class="form-help">Τα ραντεβού επιβεβαιώνονται κατόπιν επικοινωνίας με τη σχολή.</p><button class="button" id="appointment-submit" type="submit" disabled>Προεπισκόπηση αιτήματος <span aria-hidden="true">→</span></button><span>Δοκιμή χωρίς αποστολή</span></div>
          <noscript><p class="form-help">Ενεργοποίησε τη JavaScript για να δοκιμάσεις την προεπισκόπηση. Η φόρμα δεν αποστέλλει στοιχεία.</p></noscript>
        </form>
        <section class="appointment-preview" id="appointment-preview" aria-labelledby="preview-title" hidden>
          <p class="eyebrow">ΔΟΚΙΜΑΣΤΙΚΗ ΠΡΟΕΠΙΣΚΟΠΗΣΗ</p>
          <h3 id="preview-title" tabindex="-1">Το αίτημά σου, με μια ματιά.</h3>
          <p>Δεν έχει αποσταλεί αίτημα και δεν έχει κλειστεί ραντεβού. Αυτή είναι μόνο η προεπισκόπηση της φόρμας.</p>
          <dl id="appointment-summary"></dl>
          <p class="preview-reminder">Τα ραντεβού επιβεβαιώνονται κατόπιν επικοινωνίας με τη σχολή.</p>
          <button class="text-link" type="button" id="appointment-edit">Επεξεργασία στοιχείων <span aria-hidden="true">↑</span></button>
        </section>
      </div>
    </div>
  </section>`;
}
