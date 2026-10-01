const form = document.querySelector('[data-assistance-quote]');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedIssues = [...form.querySelectorAll('input[name="issue"]:checked')]
      .map((input) => input.value.trim())
      .filter(Boolean);
    const model = form.querySelector('[name="model"]')?.value.trim() || 'Não informado';
    const issueText = selectedIssues.length ? selectedIssues.join(', ') : 'Não informado';
    const message = [
      'Olá! Vim pelo Google e gostaria de fazer um orçamento para assistência técnica do meu celular.',
      '',
      `Problema(s): ${issueText}`,
      `Modelo do celular: ${model}`,
    ].join('\n');
    const whatsappUrl = `https://wa.me/5554996147882?text=${encodeURIComponent(message)}`;

    window.GoldaraTracking?.track('lead', {
      location: 'assistance_quote_form',
      issue_count: selectedIssues.length,
    });
    window.location.assign(whatsappUrl);
  });
}
