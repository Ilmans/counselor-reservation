export const counselorPricingLabel = (
    pricing_type: 'free' | 'paid',
    price_per_hour: string,
) => {
    return pricing_type === 'free'
        ? 'Gratis'
        : 'Rp ' + parseInt(price_per_hour, 10).toLocaleString('id-ID') + '/jam';
};
