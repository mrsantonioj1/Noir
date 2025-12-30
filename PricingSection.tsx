import React from 'react';

interface Tier {
  name: string;
  price: string;
  features: string[];
  link?: string;
  highlight?: boolean;
}

const tiers: Tier[] = [
  {
    name: 'Free',
    price: '$0/mo',
    features: [
      '2 images per month',
      '1080p resolution',
      'Basic features',
      '10 destinations',
    ],
  },
  {
    name: 'Pro',
    price: '$27/mo',
    features: [
      '50 images per month',
      '4K resolution',
      'All features',
      '30+ destinations',
      'Cultural wardrobe studio',
    ],
    link: 'https://buy.stripe.com/00waEZajo36qgqK5ZJ1kA0c',
  },
  {
    name: 'VIP',
    price: '$97/mo',
    features: [
      'Unlimited images',
      '8K resolution',
      'Priority processing',
      '100+ destinations',
      'RAW/TIFF export',
      'API access',
    ],
    link: 'https://buy.stripe.com/dRm00lgHM22mcauco71kA0d',
    highlight: true,
  },
  {
    name: 'Business',
    price: '$197/mo',
    features: [
      'All VIP features',
      'Brand integration',
      'Commercial rights',
      'Team accounts (5 users)',
      'Priority support',
    ],
    link: 'https://buy.stripe.com/9B69AV3V05eydey4VF1kA0e',
  },
];

/**
 * PricingSection lays out each subscription tier in a responsive grid. VIP is
 * visually highlighted to encourage conversion. Each card includes a CTA
 * linking directly to the corresponding Stripe payment link. The Free tier
 * button is styled differently and does not link to Stripe.
 */
const PricingSection: React.FC = () => {
  return (
    <div className="pricing-grid">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`pricing-card${tier.highlight ? ' highlight' : ''}`}
        >
          <h3 className="tier-name">{tier.name}</h3>
          <p className="tier-price">{tier.price}</p>
          <ul className="tier-features">
            {tier.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
          {tier.link ? (
            <a
              href={tier.link}
              className="tier-cta"
              target="_blank"
              rel="noreferrer"
            >
              Subscribe
            </a>
          ) : (
            <button className="tier-cta disabled" disabled>
              Start Free
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PricingSection;