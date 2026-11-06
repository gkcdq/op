import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type publicationModel = runtime.Types.Result.DefaultSelection<Prisma.$publicationPayload>;
export type AggregatePublication = {
    _count: PublicationCountAggregateOutputType | null;
    _min: PublicationMinAggregateOutputType | null;
    _max: PublicationMaxAggregateOutputType | null;
};
export type PublicationMinAggregateOutputType = {
    id: string | null;
    issuer: string | null;
    isin: string | null;
    cac40: boolean | null;
    type: string | null;
    subtype: string | null;
    status: string | null;
    relatedTo: string | null;
    title: string | null;
    publishedAt: Date | null;
    url: string | null;
    createdAt: Date | null;
};
export type PublicationMaxAggregateOutputType = {
    id: string | null;
    issuer: string | null;
    isin: string | null;
    cac40: boolean | null;
    type: string | null;
    subtype: string | null;
    status: string | null;
    relatedTo: string | null;
    title: string | null;
    publishedAt: Date | null;
    url: string | null;
    createdAt: Date | null;
};
export type PublicationCountAggregateOutputType = {
    id: number;
    issuer: number;
    isin: number;
    cac40: number;
    type: number;
    subtype: number;
    status: number;
    relatedTo: number;
    title: number;
    publishedAt: number;
    url: number;
    createdAt: number;
    _all: number;
};
export type PublicationMinAggregateInputType = {
    id?: true;
    issuer?: true;
    isin?: true;
    cac40?: true;
    type?: true;
    subtype?: true;
    status?: true;
    relatedTo?: true;
    title?: true;
    publishedAt?: true;
    url?: true;
    createdAt?: true;
};
export type PublicationMaxAggregateInputType = {
    id?: true;
    issuer?: true;
    isin?: true;
    cac40?: true;
    type?: true;
    subtype?: true;
    status?: true;
    relatedTo?: true;
    title?: true;
    publishedAt?: true;
    url?: true;
    createdAt?: true;
};
export type PublicationCountAggregateInputType = {
    id?: true;
    issuer?: true;
    isin?: true;
    cac40?: true;
    type?: true;
    subtype?: true;
    status?: true;
    relatedTo?: true;
    title?: true;
    publishedAt?: true;
    url?: true;
    createdAt?: true;
    _all?: true;
};
export type PublicationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.publicationWhereInput;
    orderBy?: Prisma.publicationOrderByWithRelationInput | Prisma.publicationOrderByWithRelationInput[];
    cursor?: Prisma.publicationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PublicationCountAggregateInputType;
    _min?: PublicationMinAggregateInputType;
    _max?: PublicationMaxAggregateInputType;
};
export type GetPublicationAggregateType<T extends PublicationAggregateArgs> = {
    [P in keyof T & keyof AggregatePublication]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePublication[P]> : Prisma.GetScalarType<T[P], AggregatePublication[P]>;
};
export type publicationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.publicationWhereInput;
    orderBy?: Prisma.publicationOrderByWithAggregationInput | Prisma.publicationOrderByWithAggregationInput[];
    by: Prisma.PublicationScalarFieldEnum[] | Prisma.PublicationScalarFieldEnum;
    having?: Prisma.publicationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PublicationCountAggregateInputType | true;
    _min?: PublicationMinAggregateInputType;
    _max?: PublicationMaxAggregateInputType;
};
export type PublicationGroupByOutputType = {
    id: string;
    issuer: string | null;
    isin: string | null;
    cac40: boolean;
    type: string | null;
    subtype: string | null;
    status: string | null;
    relatedTo: string | null;
    title: string | null;
    publishedAt: Date;
    url: string | null;
    createdAt: Date;
    _count: PublicationCountAggregateOutputType | null;
    _min: PublicationMinAggregateOutputType | null;
    _max: PublicationMaxAggregateOutputType | null;
};
export type GetPublicationGroupByPayload<T extends publicationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PublicationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PublicationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PublicationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PublicationGroupByOutputType[P]>;
}>>;
export type publicationWhereInput = {
    AND?: Prisma.publicationWhereInput | Prisma.publicationWhereInput[];
    OR?: Prisma.publicationWhereInput[];
    NOT?: Prisma.publicationWhereInput | Prisma.publicationWhereInput[];
    id?: Prisma.StringFilter<"publication"> | string;
    issuer?: Prisma.StringNullableFilter<"publication"> | string | null;
    isin?: Prisma.StringNullableFilter<"publication"> | string | null;
    cac40?: Prisma.BoolFilter<"publication"> | boolean;
    type?: Prisma.StringNullableFilter<"publication"> | string | null;
    subtype?: Prisma.StringNullableFilter<"publication"> | string | null;
    status?: Prisma.StringNullableFilter<"publication"> | string | null;
    relatedTo?: Prisma.StringNullableFilter<"publication"> | string | null;
    title?: Prisma.StringNullableFilter<"publication"> | string | null;
    publishedAt?: Prisma.DateTimeFilter<"publication"> | Date | string;
    url?: Prisma.StringNullableFilter<"publication"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"publication"> | Date | string;
};
export type publicationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    issuer?: Prisma.SortOrderInput | Prisma.SortOrder;
    isin?: Prisma.SortOrderInput | Prisma.SortOrder;
    cac40?: Prisma.SortOrder;
    type?: Prisma.SortOrderInput | Prisma.SortOrder;
    subtype?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    relatedTo?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type publicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.publicationWhereInput | Prisma.publicationWhereInput[];
    OR?: Prisma.publicationWhereInput[];
    NOT?: Prisma.publicationWhereInput | Prisma.publicationWhereInput[];
    issuer?: Prisma.StringNullableFilter<"publication"> | string | null;
    isin?: Prisma.StringNullableFilter<"publication"> | string | null;
    cac40?: Prisma.BoolFilter<"publication"> | boolean;
    type?: Prisma.StringNullableFilter<"publication"> | string | null;
    subtype?: Prisma.StringNullableFilter<"publication"> | string | null;
    status?: Prisma.StringNullableFilter<"publication"> | string | null;
    relatedTo?: Prisma.StringNullableFilter<"publication"> | string | null;
    title?: Prisma.StringNullableFilter<"publication"> | string | null;
    publishedAt?: Prisma.DateTimeFilter<"publication"> | Date | string;
    url?: Prisma.StringNullableFilter<"publication"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"publication"> | Date | string;
}, "id">;
export type publicationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    issuer?: Prisma.SortOrderInput | Prisma.SortOrder;
    isin?: Prisma.SortOrderInput | Prisma.SortOrder;
    cac40?: Prisma.SortOrder;
    type?: Prisma.SortOrderInput | Prisma.SortOrder;
    subtype?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrderInput | Prisma.SortOrder;
    relatedTo?: Prisma.SortOrderInput | Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.publicationCountOrderByAggregateInput;
    _max?: Prisma.publicationMaxOrderByAggregateInput;
    _min?: Prisma.publicationMinOrderByAggregateInput;
};
export type publicationScalarWhereWithAggregatesInput = {
    AND?: Prisma.publicationScalarWhereWithAggregatesInput | Prisma.publicationScalarWhereWithAggregatesInput[];
    OR?: Prisma.publicationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.publicationScalarWhereWithAggregatesInput | Prisma.publicationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"publication"> | string;
    issuer?: Prisma.StringNullableWithAggregatesFilter<"publication"> | string | null;
    isin?: Prisma.StringNullableWithAggregatesFilter<"publication"> | string | null;
    cac40?: Prisma.BoolWithAggregatesFilter<"publication"> | boolean;
    type?: Prisma.StringNullableWithAggregatesFilter<"publication"> | string | null;
    subtype?: Prisma.StringNullableWithAggregatesFilter<"publication"> | string | null;
    status?: Prisma.StringNullableWithAggregatesFilter<"publication"> | string | null;
    relatedTo?: Prisma.StringNullableWithAggregatesFilter<"publication"> | string | null;
    title?: Prisma.StringNullableWithAggregatesFilter<"publication"> | string | null;
    publishedAt?: Prisma.DateTimeWithAggregatesFilter<"publication"> | Date | string;
    url?: Prisma.StringNullableWithAggregatesFilter<"publication"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"publication"> | Date | string;
};
export type publicationCreateInput = {
    id: string;
    issuer?: string | null;
    isin?: string | null;
    cac40?: boolean;
    type?: string | null;
    subtype?: string | null;
    status?: string | null;
    relatedTo?: string | null;
    title?: string | null;
    publishedAt: Date | string;
    url?: string | null;
    createdAt?: Date | string;
};
export type publicationUncheckedCreateInput = {
    id: string;
    issuer?: string | null;
    isin?: string | null;
    cac40?: boolean;
    type?: string | null;
    subtype?: string | null;
    status?: string | null;
    relatedTo?: string | null;
    title?: string | null;
    publishedAt: Date | string;
    url?: string | null;
    createdAt?: Date | string;
};
export type publicationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    issuer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isin?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cac40?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subtype?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relatedTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type publicationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    issuer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isin?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cac40?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subtype?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relatedTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type publicationCreateManyInput = {
    id: string;
    issuer?: string | null;
    isin?: string | null;
    cac40?: boolean;
    type?: string | null;
    subtype?: string | null;
    status?: string | null;
    relatedTo?: string | null;
    title?: string | null;
    publishedAt: Date | string;
    url?: string | null;
    createdAt?: Date | string;
};
export type publicationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    issuer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isin?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cac40?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subtype?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relatedTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type publicationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    issuer?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isin?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cac40?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    type?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    subtype?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relatedTo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type publicationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    issuer?: Prisma.SortOrder;
    isin?: Prisma.SortOrder;
    cac40?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    subtype?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    relatedTo?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type publicationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    issuer?: Prisma.SortOrder;
    isin?: Prisma.SortOrder;
    cac40?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    subtype?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    relatedTo?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type publicationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    issuer?: Prisma.SortOrder;
    isin?: Prisma.SortOrder;
    cac40?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    subtype?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    relatedTo?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type publicationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    issuer?: boolean;
    isin?: boolean;
    cac40?: boolean;
    type?: boolean;
    subtype?: boolean;
    status?: boolean;
    relatedTo?: boolean;
    title?: boolean;
    publishedAt?: boolean;
    url?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["publication"]>;
export type publicationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    issuer?: boolean;
    isin?: boolean;
    cac40?: boolean;
    type?: boolean;
    subtype?: boolean;
    status?: boolean;
    relatedTo?: boolean;
    title?: boolean;
    publishedAt?: boolean;
    url?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["publication"]>;
export type publicationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    issuer?: boolean;
    isin?: boolean;
    cac40?: boolean;
    type?: boolean;
    subtype?: boolean;
    status?: boolean;
    relatedTo?: boolean;
    title?: boolean;
    publishedAt?: boolean;
    url?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["publication"]>;
export type publicationSelectScalar = {
    id?: boolean;
    issuer?: boolean;
    isin?: boolean;
    cac40?: boolean;
    type?: boolean;
    subtype?: boolean;
    status?: boolean;
    relatedTo?: boolean;
    title?: boolean;
    publishedAt?: boolean;
    url?: boolean;
    createdAt?: boolean;
};
export type publicationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "issuer" | "isin" | "cac40" | "type" | "subtype" | "status" | "relatedTo" | "title" | "publishedAt" | "url" | "createdAt", ExtArgs["result"]["publication"]>;
export type $publicationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "publication";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        issuer: string | null;
        isin: string | null;
        cac40: boolean;
        type: string | null;
        subtype: string | null;
        status: string | null;
        relatedTo: string | null;
        title: string | null;
        publishedAt: Date;
        url: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["publication"]>;
    composites: {};
};
export type publicationGetPayload<S extends boolean | null | undefined | publicationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$publicationPayload, S>;
export type publicationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<publicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PublicationCountAggregateInputType | true;
};
export interface publicationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['publication'];
        meta: {
            name: 'publication';
        };
    };
    findUnique<T extends publicationFindUniqueArgs>(args: Prisma.SelectSubset<T, publicationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__publicationClient<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends publicationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, publicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__publicationClient<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends publicationFindFirstArgs>(args?: Prisma.SelectSubset<T, publicationFindFirstArgs<ExtArgs>>): Prisma.Prisma__publicationClient<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends publicationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, publicationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__publicationClient<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends publicationFindManyArgs>(args?: Prisma.SelectSubset<T, publicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends publicationCreateArgs>(args: Prisma.SelectSubset<T, publicationCreateArgs<ExtArgs>>): Prisma.Prisma__publicationClient<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends publicationCreateManyArgs>(args?: Prisma.SelectSubset<T, publicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends publicationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, publicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends publicationDeleteArgs>(args: Prisma.SelectSubset<T, publicationDeleteArgs<ExtArgs>>): Prisma.Prisma__publicationClient<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends publicationUpdateArgs>(args: Prisma.SelectSubset<T, publicationUpdateArgs<ExtArgs>>): Prisma.Prisma__publicationClient<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends publicationDeleteManyArgs>(args?: Prisma.SelectSubset<T, publicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends publicationUpdateManyArgs>(args: Prisma.SelectSubset<T, publicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends publicationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, publicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends publicationUpsertArgs>(args: Prisma.SelectSubset<T, publicationUpsertArgs<ExtArgs>>): Prisma.Prisma__publicationClient<runtime.Types.Result.GetResult<Prisma.$publicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends publicationCountArgs>(args?: Prisma.Subset<T, publicationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PublicationCountAggregateOutputType> : number>;
    aggregate<T extends PublicationAggregateArgs>(args: Prisma.Subset<T, PublicationAggregateArgs>): Prisma.PrismaPromise<GetPublicationAggregateType<T>>;
    groupBy<T extends publicationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: publicationGroupByArgs['orderBy'];
    } : {
        orderBy?: publicationGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, publicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: publicationFieldRefs;
}
export interface Prisma__publicationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface publicationFieldRefs {
    readonly id: Prisma.FieldRef<"publication", 'String'>;
    readonly issuer: Prisma.FieldRef<"publication", 'String'>;
    readonly isin: Prisma.FieldRef<"publication", 'String'>;
    readonly cac40: Prisma.FieldRef<"publication", 'Boolean'>;
    readonly type: Prisma.FieldRef<"publication", 'String'>;
    readonly subtype: Prisma.FieldRef<"publication", 'String'>;
    readonly status: Prisma.FieldRef<"publication", 'String'>;
    readonly relatedTo: Prisma.FieldRef<"publication", 'String'>;
    readonly title: Prisma.FieldRef<"publication", 'String'>;
    readonly publishedAt: Prisma.FieldRef<"publication", 'DateTime'>;
    readonly url: Prisma.FieldRef<"publication", 'String'>;
    readonly createdAt: Prisma.FieldRef<"publication", 'DateTime'>;
}
export type publicationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelect<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    where: Prisma.publicationWhereUniqueInput;
};
export type publicationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelect<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    where: Prisma.publicationWhereUniqueInput;
};
export type publicationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelect<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    where?: Prisma.publicationWhereInput;
    orderBy?: Prisma.publicationOrderByWithRelationInput | Prisma.publicationOrderByWithRelationInput[];
    cursor?: Prisma.publicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationScalarFieldEnum | Prisma.PublicationScalarFieldEnum[];
};
export type publicationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelect<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    where?: Prisma.publicationWhereInput;
    orderBy?: Prisma.publicationOrderByWithRelationInput | Prisma.publicationOrderByWithRelationInput[];
    cursor?: Prisma.publicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationScalarFieldEnum | Prisma.PublicationScalarFieldEnum[];
};
export type publicationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelect<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    where?: Prisma.publicationWhereInput;
    orderBy?: Prisma.publicationOrderByWithRelationInput | Prisma.publicationOrderByWithRelationInput[];
    cursor?: Prisma.publicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationScalarFieldEnum | Prisma.PublicationScalarFieldEnum[];
};
export type publicationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelect<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.publicationCreateInput, Prisma.publicationUncheckedCreateInput>;
};
export type publicationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.publicationCreateManyInput | Prisma.publicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type publicationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    data: Prisma.publicationCreateManyInput | Prisma.publicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type publicationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelect<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.publicationUpdateInput, Prisma.publicationUncheckedUpdateInput>;
    where: Prisma.publicationWhereUniqueInput;
};
export type publicationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.publicationUpdateManyMutationInput, Prisma.publicationUncheckedUpdateManyInput>;
    where?: Prisma.publicationWhereInput;
    limit?: number;
};
export type publicationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.publicationUpdateManyMutationInput, Prisma.publicationUncheckedUpdateManyInput>;
    where?: Prisma.publicationWhereInput;
    limit?: number;
};
export type publicationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelect<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    where: Prisma.publicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.publicationCreateInput, Prisma.publicationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.publicationUpdateInput, Prisma.publicationUncheckedUpdateInput>;
};
export type publicationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelect<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
    where: Prisma.publicationWhereUniqueInput;
};
export type publicationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.publicationWhereInput;
    limit?: number;
};
export type publicationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.publicationSelect<ExtArgs> | null;
    omit?: Prisma.publicationOmit<ExtArgs> | null;
};
