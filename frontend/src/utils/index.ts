export function dateFormater(timestamp: string): string {
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return formattedDate;
}

export function truncateToWordLimit(paragraph: string, wordLimit: number) {
    const words = paragraph.split(/\s+/);

    if (words.length <= wordLimit) {
        return paragraph;
    }

    const truncatedWords = words.slice(0, wordLimit);

    return truncatedWords.join(' ') + '...';
}