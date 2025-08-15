// /sanity/schemas/category.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (r) => r.required().min(2),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name', maxLength: 80},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'priority',
      type: 'number',
      description: 'Lower number = higher priority in menus',
      initialValue: 100,
      validation: (r) => r.min(0),
    }),
    // Simple SEO bundle (keep it light)
    defineField({
      name: 'seoTitle',
      type: 'string',
      description: 'Custom <title>. Defaults to name if empty',
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      rows: 3,
      description: 'Up to ~160 chars',
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Category Icon',
      description: 'Icon or representative image for this category. Recommended size: 400x400px',
      options: {hotspot: true},
      fields: [{name: 'alt', type: 'string'}],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'slug.current', media: 'image'},
  },
})
