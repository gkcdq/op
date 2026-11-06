import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PublicationModel = runtime.Types.Result.DefaultSelection<Prisma.$PublicationPayload>;
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
    where?: Prisma.PublicationWhereInput;
    orderBy?: Prisma.PublicationOrderByWithRelationInput | Prisma.PublicationOrderByWithRelationInput[];
    cursor?: Prisma.PublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PublicationCountAggregateInputType;
    _min?: PublicationMinAggregateInputType;
    _max?: PublicationMaxAggregateInputType;
};
export type GetPublicationAggregateType<T extends PublicationAggregateArgs> = {
    [P in keyof T & keyof AggregatePublication]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePublication[P]> : Prisma.GetScalarType<T[P], AggregatePublication[P]>;
};
export type PublicationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationWhereInput;
    orderBy?: Prisma.PublicationOrderByWithAggregationInput | Prisma.PublicationOrderByWithAggregationInput[];
    by: Prisma.PublicationScalarFieldEnum[] | Prisma.PublicationScalarFieldEnum;
    having?: Prisma.PublicationScalarWhereWithAggregatesInput;
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
export type GetPublicationGroupByPayload<T extends PublicationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PublicationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PublicationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PublicationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PublicationGroupByOutputType[P]>;
}>>;
export type PublicationWhereInput = {
    AND?: Prisma.PublicationWhereInput | Prisma.PublicationWhereInput[];
    OR?: Prisma.PublicationWhereInput[];
    NOT?: Prisma.PublicationWhereInput | Prisma.PublicationWhereInput[];
    id?: Prisma.StringFilter<"Publication"> | string;
    issuer?: Prisma.StringNullableFilter<"Publication"> | string | null;
    isin?: Prisma.StringNullableFilter<"Publication"> | string | null;
    cac40?: Prisma.BoolFilter<"Publication"> | boolean;
    type?: Prisma.StringNullableFilter<"Publication"> | string | null;
    subtype?: Prisma.StringNullableFilter<"Publication"> | string | null;
    status?: Prisma.StringNullableFilter<"Publication"> | string | null;
    relatedTo?: Prisma.StringNullableFilter<"Publication"> | string | null;
    title?: Prisma.StringNullableFilter<"Publication"> | string | null;
    publishedAt?: Prisma.DateTimeFilter<"Publication"> | Date | string;
    url?: Prisma.StringNullableFilter<"Publication"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Publication"> | Date | string;
};
export type PublicationOrderByWithRelationInput = {
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
export type PublicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PublicationWhereInput | Prisma.PublicationWhereInput[];
    OR?: Prisma.PublicationWhereInput[];
    NOT?: Prisma.PublicationWhereInput | Prisma.PublicationWhereInput[];
    issuer?: Prisma.StringNullableFilter<"Publication"> | string | null;
    isin?: Prisma.StringNullableFilter<"Publication"> | string | null;
    cac40?: Prisma.BoolFilter<"Publication"> | boolean;
    type?: Prisma.StringNullableFilter<"Publication"> | string | null;
    subtype?: Prisma.StringNullableFilter<"Publication"> | string | null;
    status?: Prisma.StringNullableFilter<"Publication"> | string | null;
    relatedTo?: Prisma.StringNullableFilter<"Publication"> | string | null;
    title?: Prisma.StringNullableFilter<"Publication"> | string | null;
    publishedAt?: Prisma.DateTimeFilter<"Publication"> | Date | string;
    url?: Prisma.StringNullableFilter<"Publication"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Publication"> | Date | string;
}, "id">;
export type PublicationOrderByWithAggregationInput = {
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
    _count?: Prisma.PublicationCountOrderByAggregateInput;
    _max?: Prisma.PublicationMaxOrderByAggregateInput;
    _min?: Prisma.PublicationMinOrderByAggregateInput;
};
export type PublicationScalarWhereWithAggregatesInput = {
    AND?: Prisma.PublicationScalarWhereWithAggregatesInput | Prisma.PublicationScalarWhereWithAggregatesInput[];
    OR?: Prisma.PublicationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PublicationScalarWhereWithAggregatesInput | Prisma.PublicationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Publication"> | string;
    issuer?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    isin?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    cac40?: Prisma.BoolWithAggregatesFilter<"Publication"> | boolean;
    type?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    subtype?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    status?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    relatedTo?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    title?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    publishedAt?: Prisma.DateTimeWithAggregatesFilter<"Publication"> | Date | string;
    url?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Publication"> | Date | string;
};
export type PublicationCreateInput = {
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
export type PublicationUncheckedCreateInput = {
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
export type PublicationUpdateInput = {
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
export type PublicationUncheckedUpdateInput = {
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
export type PublicationCreateManyInput = {
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
export type PublicationUpdateManyMutationInput = {
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
export type PublicationUncheckedUpdateManyInput = {
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
export type PublicationCountOrderByAggregateInput = {
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
export type PublicationMaxOrderByAggregateInput = {
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
export type PublicationMinOrderByAggregateInput = {
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
export type PublicationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
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
export type PublicationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
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
export type PublicationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
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
export type PublicationSelectScalar = {
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
export type PublicationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "issuer" | "isin" | "cac40" | "type" | "subtype" | "status" | "relatedTo" | "title" | "publishedAt" | "url" | "createdAt", ExtArgs["result"]["publication"]>;
export type $PublicationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Publication";
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
export type PublicationGetPayload<S extends boolean | null | undefined | PublicationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PublicationPayload, S>;
export type PublicationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PublicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PublicationCountAggregateInputType | true;
};
export interface PublicationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Publication'];
        meta: {
            name: 'Publication';
        };
    };
    findUnique<T extends PublicationFindUniqueArgs>(args: Prisma.SelectSubset<T, PublicationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PublicationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PublicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PublicationFindFirstArgs>(args?: Prisma.SelectSubset<T, PublicationFindFirstArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PublicationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PublicationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PublicationFindManyArgs>(args?: Prisma.SelectSubset<T, PublicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PublicationCreateArgs>(args: Prisma.SelectSubset<T, PublicationCreateArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PublicationCreateManyArgs>(args?: Prisma.SelectSubset<T, PublicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PublicationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PublicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PublicationDeleteArgs>(args: Prisma.SelectSubset<T, PublicationDeleteArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PublicationUpdateArgs>(args: Prisma.SelectSubset<T, PublicationUpdateArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PublicationDeleteManyArgs>(args?: Prisma.SelectSubset<T, PublicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PublicationUpdateManyArgs>(args: Prisma.SelectSubset<T, PublicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PublicationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PublicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PublicationUpsertArgs>(args: Prisma.SelectSubset<T, PublicationUpsertArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PublicationCountArgs>(args?: Prisma.Subset<T, PublicationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PublicationCountAggregateOutputType> : number>;
    aggregate<T extends PublicationAggregateArgs>(args: Prisma.Subset<T, PublicationAggregateArgs>): Prisma.PrismaPromise<GetPublicationAggregateType<T>>;
    groupBy<T extends PublicationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PublicationGroupByArgs['orderBy'];
    } : {
        orderBy?: PublicationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PublicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PublicationFieldRefs;
}
export interface Prisma__PublicationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PublicationFieldRefs {
    readonly id: Prisma.FieldRef<"Publication", 'String'>;
    readonly issuer: Prisma.FieldRef<"Publication", 'String'>;
    readonly isin: Prisma.FieldRef<"Publication", 'String'>;
    readonly cac40: Prisma.FieldRef<"Publication", 'Boolean'>;
    readonly type: Prisma.FieldRef<"Publication", 'String'>;
    readonly subtype: Prisma.FieldRef<"Publication", 'String'>;
    readonly status: Prisma.FieldRef<"Publication", 'String'>;
    readonly relatedTo: Prisma.FieldRef<"Publication", 'String'>;
    readonly title: Prisma.FieldRef<"Publication", 'String'>;
    readonly publishedAt: Prisma.FieldRef<"Publication", 'DateTime'>;
    readonly url: Prisma.FieldRef<"Publication", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Publication", 'DateTime'>;
}
export type PublicationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    where: Prisma.PublicationWhereUniqueInput;
};
export type PublicationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    where: Prisma.PublicationWhereUniqueInput;
};
export type PublicationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    where?: Prisma.PublicationWhereInput;
    orderBy?: Prisma.PublicationOrderByWithRelationInput | Prisma.PublicationOrderByWithRelationInput[];
    cursor?: Prisma.PublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationScalarFieldEnum | Prisma.PublicationScalarFieldEnum[];
};
export type PublicationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    where?: Prisma.PublicationWhereInput;
    orderBy?: Prisma.PublicationOrderByWithRelationInput | Prisma.PublicationOrderByWithRelationInput[];
    cursor?: Prisma.PublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationScalarFieldEnum | Prisma.PublicationScalarFieldEnum[];
};
export type PublicationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    where?: Prisma.PublicationWhereInput;
    orderBy?: Prisma.PublicationOrderByWithRelationInput | Prisma.PublicationOrderByWithRelationInput[];
    cursor?: Prisma.PublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationScalarFieldEnum | Prisma.PublicationScalarFieldEnum[];
};
export type PublicationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationCreateInput, Prisma.PublicationUncheckedCreateInput>;
};
export type PublicationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PublicationCreateManyInput | Prisma.PublicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PublicationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    data: Prisma.PublicationCreateManyInput | Prisma.PublicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PublicationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationUpdateInput, Prisma.PublicationUncheckedUpdateInput>;
    where: Prisma.PublicationWhereUniqueInput;
};
export type PublicationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PublicationUpdateManyMutationInput, Prisma.PublicationUncheckedUpdateManyInput>;
    where?: Prisma.PublicationWhereInput;
    limit?: number;
};
export type PublicationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationUpdateManyMutationInput, Prisma.PublicationUncheckedUpdateManyInput>;
    where?: Prisma.PublicationWhereInput;
    limit?: number;
};
export type PublicationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    where: Prisma.PublicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.PublicationCreateInput, Prisma.PublicationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PublicationUpdateInput, Prisma.PublicationUncheckedUpdateInput>;
};
export type PublicationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    where: Prisma.PublicationWhereUniqueInput;
};
export type PublicationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationWhereInput;
    limit?: number;
};
export type PublicationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
};
