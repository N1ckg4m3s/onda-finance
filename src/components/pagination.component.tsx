import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "./ui/pagination"

interface props {
    actualPage: number,
    changePage: (page: number) => void,
    totalPages: number
}

export const PaginationComponent: React.FC<props> = ({ actualPage, changePage, totalPages }) => {
    return (
        <Pagination>
            <PaginationContent>

                {
                    actualPage > 1 &&
                    <PaginationItem>
                        <PaginationPrevious onClick={() => changePage(Math.max(actualPage - 1, 1))} size={totalPages} />
                    </PaginationItem>
                }

                <PaginationItem>
                    <span className="px-3 text-sm">Página {actualPage}</span>
                </PaginationItem>

                {
                    actualPage < totalPages &&
                    <PaginationItem>
                        <PaginationNext onClick={() => changePage(Math.min(actualPage + 1, totalPages + 1))} size={totalPages} />
                    </PaginationItem>
                }


            </PaginationContent>
        </Pagination>
    )
}