# Migração de rastreamento

## Regra principal
Não publicar `main` no domínio oficial antes de copiar e validar os IDs atuais do site antigo.

## Manter os mesmos ativos
- Google Analytics 4: mesma propriedade e mesmo Measurement ID.
- Google Ads: mesmas conversões e mesmas ações de conversão sempre que possível.
- Google Tag Manager: mesmo container, se o site antigo usar GTM.
- Meta Pixel: mesmo Pixel ID.
- Search Console: mesma propriedade de domínio.

## Eventos previstos no novo site
- `page_view`
- `view_item`
- `ViewContent`
- `Lead`
- `cta_click`
- `whatsapp_click`
- `maps_click`
- `reviews_click`

## Preservação de campanha
O arquivo `assets/site.js` preserva em `localStorage`:
`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid`, `wbraid`, `fbclid`.

## Antes do go-live
1. Confirmar IDs atuais no Google Ads/GA4/GTM/Meta.
2. Configurar os IDs em `assets/site.js` ou no mecanismo de tags escolhido.
3. Testar Real Time do GA4.
4. Testar Google Ads Tag Assistant/diagnóstico.
5. Testar Meta Events Manager/Test Events.
6. Clicar em todos os CTAs e conferir eventos.
7. Só depois trocar o apontamento do domínio.
