# Migração de rastreamento

## IDs confirmados no export do site antigo
- **GA4 Measurement ID:** `G-TGK0SBQ67Y`
- **Meta Pixel ID:** `1607294577443562`

Esses mesmos IDs já estão configurados em `assets/site.js` na branch `staging`.

## O que NÃO foi encontrado no código exportado
- Nenhum `GTM-...` (Google Tag Manager).
- Nenhum `AW-...` (Google Ads conversion tag) explícito.

Isso não prova que não exista uma configuração adicional fora do código exportado. Antes do go-live, precisamos conferir o Google Ads, Google Tag Manager (se existir) e as configurações de conversão da conta.

## Eventos e preservação de campanha
O novo site preserva em `localStorage`:
`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid`, `wbraid`, `fbclid`.

Eventos previstos:
- `page_view`
- `view_item`
- `ViewContent`
- `Lead`
- `cta_click`
- `whatsapp_click`
- `maps_click`
- `reviews_click`

## Regra de publicação
Não trocar o domínio oficial até validar:
1. GA4 em tempo real.
2. Google Ads/Tag Assistant e conversões.
3. Meta Events Manager/Test Events.
4. Cliques de WhatsApp, Maps e CTAs.
5. Preservação das UTMs e identificadores de campanha.
6. Search Console, sitemap e páginas indexáveis.
