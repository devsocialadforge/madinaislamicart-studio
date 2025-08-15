// /sanity/schemas/product.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // Basic Product Information
    defineField({
      name: 'name',
      type: 'string',
      title: 'Product Name',
      description: 'The name of the product',
      validation: (r) => r.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      description: 'URL-friendly identifier (auto-generated from product name)',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Product Description',
      description: 'Rich text description of the product',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [{name: 'alt', type: 'string'}],
        },
      ],
      validation: (r) => r.required().min(1),
    }),

    // Pricing
    defineField({
      name: 'price',
      type: 'number',
      title: 'Price',
      description: 'Product price in your currency',
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: 'discountPercentage',
      type: 'number',
      title: 'Discount Percentage',
      description: 'Discount percentage (0-100)',
      initialValue: 0,
      validation: (r) => r.min(0).max(100),
    }),
    defineField({
      name: 'discountPrice',
      type: 'number',
      title: 'Discount Price',
      description: 'Final price after discount (auto-calculated)',
      readOnly: true,
      validation: (r) => r.min(0),
    }),

    // Product Flags
    defineField({
      name: 'isMostPopular',
      type: 'boolean',
      title: 'Most Popular',
      description: 'Mark as most popular product',
      initialValue: false,
    }),
    defineField({
      name: 'isTrending',
      type: 'boolean',
      title: 'Trending',
      description: 'Mark as trending product',
      initialValue: false,
    }),

    // Stock Management
    defineField({
      name: 'stockQuantity',
      type: 'boolean',
      title: 'In Stock',
      description: 'Whether this product is currently in stock/available',
      initialValue: true,
    }),

    // Images
    defineField({
      name: 'images',
      type: 'array',
      title: 'Product Images',
      description:
        'Product images (minimum 3 required). Recommended size: 800x800px for square format, 1200x800px for landscape',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Alternative text for accessibility',
              validation: (r) => r.required(),
            },
          ],
        },
      ],
      validation: (r) => r.required().min(3),
    }),

    // Priority for Sorting
    defineField({
      name: 'priority',
      type: 'number',
      title: 'Priority',
      description: 'Lower number = higher priority in collections',
      initialValue: 100,
      validation: (r) => r.min(0),
    }),

    // Category Reference
    defineField({
      name: 'category',
      type: 'reference',
      title: 'Category',
      description: 'Product category',
      to: [{type: 'category'}],
      validation: (r) => r.required(),
    }),

    // Related Products
    defineField({
      name: 'relatedProducts',
      type: 'array',
      title: 'Related Products',
      description: 'Other products that are related to this one',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
    }),

    // SEO Fields
    defineField({
      name: 'metaTitle',
      type: 'string',
      title: 'Meta Title',
      description: 'Custom page title for SEO (defaults to product name if empty)',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description: 'SEO description (up to ~160 characters)',
      rows: 3,
      validation: (r) => r.max(200),
    }),

    // Open Graph Image with Alt Text
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image',
      description: 'Image for social media sharing (recommended: 1200x630px)',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for Open Graph image (required)',
          validation: (r) => r.required(),
        },
      ],
    }),
  ],

  // Preview configuration for Sanity Studio
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'images.0',
    },
    prepare(selection: any) {
      const {title, subtitle, media} = selection
      return {
        title: title,
        subtitle: `$${subtitle || 0}`,
        media: media,
      }
    },
  },

  // Order by priority and name
  orderings: [
    {
      title: 'Priority, Low to High',
      name: 'priorityAsc',
      by: [{field: 'priority', direction: 'asc'}],
    },
    {
      title: 'Priority, High to Low',
      name: 'priorityDesc',
      by: [{field: 'priority', direction: 'desc'}],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Price, Low to High',
      name: 'priceAsc',
      by: [{field: 'price', direction: 'asc'}],
    },
    {
      title: 'Price, High to Low',
      name: 'priceDesc',
      by: [{field: 'price', direction: 'desc'}],
    },
  ],
})
