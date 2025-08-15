import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Customer Name',
      description: 'Full name of the customer',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      title: 'Customer Avatar',
      description: 'Profile picture of the customer (optional)',
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
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating',
      description: 'Customer rating from 1 to 5 stars',
      validation: (r) => r.required().min(1).max(5),
      options: {
        list: [
          {title: '1 Star', value: 1},
          {title: '2 Stars', value: 2},
          {title: '3 Stars', value: 3},
          {title: '4 Stars', value: 4},
          {title: '5 Stars', value: 5},
        ],
      },
    }),
    defineField({
      name: 'review',
      type: 'text',
      title: 'Review Text',
      description: 'Customer review content',
      rows: 4,
      validation: (r) => r.required().min(10).max(500),
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Customer Location',
      description: 'City and country (e.g., "Dubai, UAE")',
    }),
    defineField({
      name: 'verified',
      type: 'boolean',
      title: 'Verified Purchase',
      description: 'Whether this is a verified purchase review',
      initialValue: false,
    }),
    defineField({
      name: 'isApproved',
      type: 'boolean',
      title: 'Approved',
      description: 'Review is approved and visible on the website',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'review',
      rating: 'rating',
      media: 'avatar',
    },
    prepare(selection) {
      const {title, subtitle, rating, media} = selection
      return {
        title: title || 'Anonymous Review',
        subtitle: `${rating} stars - ${subtitle?.slice(0, 50)}${subtitle?.length > 50 ? '...' : ''}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
    {
      title: 'Highest Rating',
      name: 'highestRating',
      by: [{field: 'rating', direction: 'desc'}],
    },
  ],
})
