import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Banner Title',
      description: 'Main heading for the banner',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Banner Description',
      description: 'Subtitle or description text',
      rows: 2,
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
      description: 'Text displayed on the button (e.g., "Shop Now", "Learn More")',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'buttonLink',
      type: 'url',
      title: 'Button Link',
      description: 'URL for the button link',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Order in which banners appear (1 = first)',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      description: 'Show this banner on the website',
      initialValue: true,
    }),
    defineField({
      name: 'mobileImage',
      type: 'image',
      title: 'Mobile Image',
      description: 'Mobile banner image. Size: 700x300px',
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
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tabletImage',
      type: 'image',
      title: 'Tablet Image',
      description: 'Tablet banner image. Size: 1400x600px',
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
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'desktopImage',
      type: 'image',
      title: 'Desktop Image',
      description: 'Desktop banner image. Size: 3000x720px',
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
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'desktopImage',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Untitled Banner',
        subtitle: subtitle || 'No description',
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
