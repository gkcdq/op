import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type llmVerificationModel = runtime.Types.Result.DefaultSelection<Prisma.$llmVerificationPayload>;
export type AggregateLlmVerification = {
    _count: LlmVerificationCountAggregateOutputType | null;
    _avg: LlmVerificationAvgAggregateOutputType | null;
    _sum: LlmVerificationSumAggregateOutputType | null;
    _min: LlmVerificationMinAggregateOutputType | null;
    _max: LlmVerificationMaxAggregateOutputType | null;
};
export type LlmVerificationAvgAggregateOutputType = {
    id: number | null;
};
export type LlmVerificationSumAggregateOutputType = {
    id: number | null;
};
export type LlmVerificationMinAggregateOutputType = {
    id: number | null;
    isin: string | null;
    publishedAt: Date | null;
    documentUrl: string | null;
    model: string | null;
    status: string | null;
    error: string | null;
    generatedAt: Date | null;
};
export type LlmVerificationMaxAggregateOutputType = {
    id: number | null;
    isin: string | null;
    publishedAt: Date | null;
    documentUrl: string | null;
    model: string | null;
    status: string | null;
    error: string | null;
    generatedAt: Date | null;
};
export type LlmVerificationCountAggregateOutputType = {
    id: number;
    isin: number;
    publishedAt: number;
    documentUrl: number;
    model: number;
    status: number;
    briefJson: number;
    error: number;
    generatedAt: number;
    _all: number;
};
export type LlmVerificationAvgAggregateInputType = {
    id?: true;
};
export type LlmVerificationSumAggregateInputType = {
    id?: true;
};
export type LlmVerificationMinAggregateInputType = {
    id?: true;
    isin?: true;
    publishedAt?: true;
    documentUrl?: true;
    model?: true;
    status?: true;
    error?: true;
    generatedAt?: true;
};
export type LlmVerificationMaxAggregateInputType = {
    id?: true;
    isin?: true;
    publishedAt?: true;
    documentUrl?: true;
    model?: true;
    status?: true;
    error?: true;
    generatedAt?: true;
};
export type LlmVerificationCountAggregateInputType = {
    id?: true;
    isin?: true;
    publishedAt?: true;
    documentUrl?: true;
    model?: true;
    status?: true;
    briefJson?: true;
    error?: true;
    generatedAt?: true;
    _all?: true;
};
export type LlmVerificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.llmVerificationWhereInput;
    orderBy?: Prisma.llmVerificationOrderByWithRelationInput | Prisma.llmVerificationOrderByWithRelationInput[];
    cursor?: Prisma.llmVerificationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LlmVerificationCountAggregateInputType;
    _avg?: LlmVerificationAvgAggregateInputType;
    _sum?: LlmVerificationSumAggregateInputType;
    _min?: LlmVerificationMinAggregateInputType;
    _max?: LlmVerificationMaxAggregateInputType;
};
export type GetLlmVerificationAggregateType<T extends LlmVerificationAggregateArgs> = {
    [P in keyof T & keyof AggregateLlmVerification]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLlmVerification[P]> : Prisma.GetScalarType<T[P], AggregateLlmVerification[P]>;
};
export type llmVerificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.llmVerificationWhereInput;
    orderBy?: Prisma.llmVerificationOrderByWithAggregationInput | Prisma.llmVerificationOrderByWithAggregationInput[];
    by: Prisma.LlmVerificationScalarFieldEnum[] | Prisma.LlmVerificationScalarFieldEnum;
    having?: Prisma.llmVerificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LlmVerificationCountAggregateInputType | true;
    _avg?: LlmVerificationAvgAggregateInputType;
    _sum?: LlmVerificationSumAggregateInputType;
    _min?: LlmVerificationMinAggregateInputType;
    _max?: LlmVerificationMaxAggregateInputType;
};
export type LlmVerificationGroupByOutputType = {
    id: number;
    isin: string;
    publishedAt: Date;
    documentUrl: string;
    model: string;
    status: string;
    briefJson: runtime.JsonValue | null;
    error: string | null;
    generatedAt: Date;
    _count: LlmVerificationCountAggregateOutputType | null;
    _avg: LlmVerificationAvgAggregateOutputType | null;
    _sum: LlmVerificationSumAggregateOutputType | null;
    _min: LlmVerificationMinAggregateOutputType | null;
    _max: LlmVerificationMaxAggregateOutputType | null;
};
export type GetLlmVerificationGroupByPayload<T extends llmVerificationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LlmVerificationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LlmVerificationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LlmVerificationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LlmVerificationGroupByOutputType[P]>;
}>>;
export type llmVerificationWhereInput = {
    AND?: Prisma.llmVerificationWhereInput | Prisma.llmVerificationWhereInput[];
    OR?: Prisma.llmVerificationWhereInput[];
    NOT?: Prisma.llmVerificationWhereInput | Prisma.llmVerificationWhereInput[];
    id?: Prisma.IntFilter<"llmVerification"> | number;
    isin?: Prisma.StringFilter<"llmVerification"> | string;
    publishedAt?: Prisma.DateTimeFilter<"llmVerification"> | Date | string;
    documentUrl?: Prisma.StringFilter<"llmVerification"> | string;
    model?: Prisma.StringFilter<"llmVerification"> | string;
    status?: Prisma.StringFilter<"llmVerification"> | string;
    briefJson?: Prisma.JsonNullableFilter<"llmVerification">;
    error?: Prisma.StringNullableFilter<"llmVerification"> | string | null;
    generatedAt?: Prisma.DateTimeFilter<"llmVerification"> | Date | string;
};
export type llmVerificationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    isin?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    documentUrl?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    briefJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
};
export type llmVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    cle_unique?: Prisma.llmVerificationCle_uniqueCompoundUniqueInput;
    AND?: Prisma.llmVerificationWhereInput | Prisma.llmVerificationWhereInput[];
    OR?: Prisma.llmVerificationWhereInput[];
    NOT?: Prisma.llmVerificationWhereInput | Prisma.llmVerificationWhereInput[];
    isin?: Prisma.StringFilter<"llmVerification"> | string;
    publishedAt?: Prisma.DateTimeFilter<"llmVerification"> | Date | string;
    documentUrl?: Prisma.StringFilter<"llmVerification"> | string;
    model?: Prisma.StringFilter<"llmVerification"> | string;
    status?: Prisma.StringFilter<"llmVerification"> | string;
    briefJson?: Prisma.JsonNullableFilter<"llmVerification">;
    error?: Prisma.StringNullableFilter<"llmVerification"> | string | null;
    generatedAt?: Prisma.DateTimeFilter<"llmVerification"> | Date | string;
}, "id" | "cle_unique">;
export type llmVerificationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    isin?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    documentUrl?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    briefJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    _count?: Prisma.llmVerificationCountOrderByAggregateInput;
    _avg?: Prisma.llmVerificationAvgOrderByAggregateInput;
    _max?: Prisma.llmVerificationMaxOrderByAggregateInput;
    _min?: Prisma.llmVerificationMinOrderByAggregateInput;
    _sum?: Prisma.llmVerificationSumOrderByAggregateInput;
};
export type llmVerificationScalarWhereWithAggregatesInput = {
    AND?: Prisma.llmVerificationScalarWhereWithAggregatesInput | Prisma.llmVerificationScalarWhereWithAggregatesInput[];
    OR?: Prisma.llmVerificationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.llmVerificationScalarWhereWithAggregatesInput | Prisma.llmVerificationScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"llmVerification"> | number;
    isin?: Prisma.StringWithAggregatesFilter<"llmVerification"> | string;
    publishedAt?: Prisma.DateTimeWithAggregatesFilter<"llmVerification"> | Date | string;
    documentUrl?: Prisma.StringWithAggregatesFilter<"llmVerification"> | string;
    model?: Prisma.StringWithAggregatesFilter<"llmVerification"> | string;
    status?: Prisma.StringWithAggregatesFilter<"llmVerification"> | string;
    briefJson?: Prisma.JsonNullableWithAggregatesFilter<"llmVerification">;
    error?: Prisma.StringNullableWithAggregatesFilter<"llmVerification"> | string | null;
    generatedAt?: Prisma.DateTimeWithAggregatesFilter<"llmVerification"> | Date | string;
};
export type llmVerificationCreateInput = {
    isin: string;
    publishedAt: Date | string;
    documentUrl: string;
    model: string;
    status: string;
    briefJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: string | null;
    generatedAt?: Date | string;
};
export type llmVerificationUncheckedCreateInput = {
    id?: number;
    isin: string;
    publishedAt: Date | string;
    documentUrl: string;
    model: string;
    status: string;
    briefJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: string | null;
    generatedAt?: Date | string;
};
export type llmVerificationUpdateInput = {
    isin?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documentUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    briefJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type llmVerificationUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    isin?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documentUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    briefJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type llmVerificationCreateManyInput = {
    id?: number;
    isin: string;
    publishedAt: Date | string;
    documentUrl: string;
    model: string;
    status: string;
    briefJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: string | null;
    generatedAt?: Date | string;
};
export type llmVerificationUpdateManyMutationInput = {
    isin?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documentUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    briefJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type llmVerificationUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    isin?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documentUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    briefJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type llmVerificationCle_uniqueCompoundUniqueInput = {
    isin: string;
    publishedAt: Date | string;
    documentUrl: string;
    model: string;
};
export type llmVerificationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    isin?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    documentUrl?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    briefJson?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
};
export type llmVerificationAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type llmVerificationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    isin?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    documentUrl?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
};
export type llmVerificationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    isin?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    documentUrl?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
};
export type llmVerificationSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type llmVerificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    isin?: boolean;
    publishedAt?: boolean;
    documentUrl?: boolean;
    model?: boolean;
    status?: boolean;
    briefJson?: boolean;
    error?: boolean;
    generatedAt?: boolean;
}, ExtArgs["result"]["llmVerification"]>;
export type llmVerificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    isin?: boolean;
    publishedAt?: boolean;
    documentUrl?: boolean;
    model?: boolean;
    status?: boolean;
    briefJson?: boolean;
    error?: boolean;
    generatedAt?: boolean;
}, ExtArgs["result"]["llmVerification"]>;
export type llmVerificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    isin?: boolean;
    publishedAt?: boolean;
    documentUrl?: boolean;
    model?: boolean;
    status?: boolean;
    briefJson?: boolean;
    error?: boolean;
    generatedAt?: boolean;
}, ExtArgs["result"]["llmVerification"]>;
export type llmVerificationSelectScalar = {
    id?: boolean;
    isin?: boolean;
    publishedAt?: boolean;
    documentUrl?: boolean;
    model?: boolean;
    status?: boolean;
    briefJson?: boolean;
    error?: boolean;
    generatedAt?: boolean;
};
export type llmVerificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "isin" | "publishedAt" | "documentUrl" | "model" | "status" | "briefJson" | "error" | "generatedAt", ExtArgs["result"]["llmVerification"]>;
export type $llmVerificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "llmVerification";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        isin: string;
        publishedAt: Date;
        documentUrl: string;
        model: string;
        status: string;
        briefJson: runtime.JsonValue | null;
        error: string | null;
        generatedAt: Date;
    }, ExtArgs["result"]["llmVerification"]>;
    composites: {};
};
export type llmVerificationGetPayload<S extends boolean | null | undefined | llmVerificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload, S>;
export type llmVerificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<llmVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LlmVerificationCountAggregateInputType | true;
};
export interface llmVerificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['llmVerification'];
        meta: {
            name: 'llmVerification';
        };
    };
    findUnique<T extends llmVerificationFindUniqueArgs>(args: Prisma.SelectSubset<T, llmVerificationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__llmVerificationClient<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends llmVerificationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, llmVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__llmVerificationClient<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends llmVerificationFindFirstArgs>(args?: Prisma.SelectSubset<T, llmVerificationFindFirstArgs<ExtArgs>>): Prisma.Prisma__llmVerificationClient<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends llmVerificationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, llmVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__llmVerificationClient<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends llmVerificationFindManyArgs>(args?: Prisma.SelectSubset<T, llmVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends llmVerificationCreateArgs>(args: Prisma.SelectSubset<T, llmVerificationCreateArgs<ExtArgs>>): Prisma.Prisma__llmVerificationClient<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends llmVerificationCreateManyArgs>(args?: Prisma.SelectSubset<T, llmVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends llmVerificationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, llmVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends llmVerificationDeleteArgs>(args: Prisma.SelectSubset<T, llmVerificationDeleteArgs<ExtArgs>>): Prisma.Prisma__llmVerificationClient<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends llmVerificationUpdateArgs>(args: Prisma.SelectSubset<T, llmVerificationUpdateArgs<ExtArgs>>): Prisma.Prisma__llmVerificationClient<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends llmVerificationDeleteManyArgs>(args?: Prisma.SelectSubset<T, llmVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends llmVerificationUpdateManyArgs>(args: Prisma.SelectSubset<T, llmVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends llmVerificationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, llmVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends llmVerificationUpsertArgs>(args: Prisma.SelectSubset<T, llmVerificationUpsertArgs<ExtArgs>>): Prisma.Prisma__llmVerificationClient<runtime.Types.Result.GetResult<Prisma.$llmVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends llmVerificationCountArgs>(args?: Prisma.Subset<T, llmVerificationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LlmVerificationCountAggregateOutputType> : number>;
    aggregate<T extends LlmVerificationAggregateArgs>(args: Prisma.Subset<T, LlmVerificationAggregateArgs>): Prisma.PrismaPromise<GetLlmVerificationAggregateType<T>>;
    groupBy<T extends llmVerificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: llmVerificationGroupByArgs['orderBy'];
    } : {
        orderBy?: llmVerificationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, llmVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLlmVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: llmVerificationFieldRefs;
}
export interface Prisma__llmVerificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface llmVerificationFieldRefs {
    readonly id: Prisma.FieldRef<"llmVerification", 'Int'>;
    readonly isin: Prisma.FieldRef<"llmVerification", 'String'>;
    readonly publishedAt: Prisma.FieldRef<"llmVerification", 'DateTime'>;
    readonly documentUrl: Prisma.FieldRef<"llmVerification", 'String'>;
    readonly model: Prisma.FieldRef<"llmVerification", 'String'>;
    readonly status: Prisma.FieldRef<"llmVerification", 'String'>;
    readonly briefJson: Prisma.FieldRef<"llmVerification", 'Json'>;
    readonly error: Prisma.FieldRef<"llmVerification", 'String'>;
    readonly generatedAt: Prisma.FieldRef<"llmVerification", 'DateTime'>;
}
export type llmVerificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelect<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    where: Prisma.llmVerificationWhereUniqueInput;
};
export type llmVerificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelect<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    where: Prisma.llmVerificationWhereUniqueInput;
};
export type llmVerificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelect<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    where?: Prisma.llmVerificationWhereInput;
    orderBy?: Prisma.llmVerificationOrderByWithRelationInput | Prisma.llmVerificationOrderByWithRelationInput[];
    cursor?: Prisma.llmVerificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LlmVerificationScalarFieldEnum | Prisma.LlmVerificationScalarFieldEnum[];
};
export type llmVerificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelect<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    where?: Prisma.llmVerificationWhereInput;
    orderBy?: Prisma.llmVerificationOrderByWithRelationInput | Prisma.llmVerificationOrderByWithRelationInput[];
    cursor?: Prisma.llmVerificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LlmVerificationScalarFieldEnum | Prisma.LlmVerificationScalarFieldEnum[];
};
export type llmVerificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelect<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    where?: Prisma.llmVerificationWhereInput;
    orderBy?: Prisma.llmVerificationOrderByWithRelationInput | Prisma.llmVerificationOrderByWithRelationInput[];
    cursor?: Prisma.llmVerificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LlmVerificationScalarFieldEnum | Prisma.LlmVerificationScalarFieldEnum[];
};
export type llmVerificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelect<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.llmVerificationCreateInput, Prisma.llmVerificationUncheckedCreateInput>;
};
export type llmVerificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.llmVerificationCreateManyInput | Prisma.llmVerificationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type llmVerificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    data: Prisma.llmVerificationCreateManyInput | Prisma.llmVerificationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type llmVerificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelect<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.llmVerificationUpdateInput, Prisma.llmVerificationUncheckedUpdateInput>;
    where: Prisma.llmVerificationWhereUniqueInput;
};
export type llmVerificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.llmVerificationUpdateManyMutationInput, Prisma.llmVerificationUncheckedUpdateManyInput>;
    where?: Prisma.llmVerificationWhereInput;
    limit?: number;
};
export type llmVerificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.llmVerificationUpdateManyMutationInput, Prisma.llmVerificationUncheckedUpdateManyInput>;
    where?: Prisma.llmVerificationWhereInput;
    limit?: number;
};
export type llmVerificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelect<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    where: Prisma.llmVerificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.llmVerificationCreateInput, Prisma.llmVerificationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.llmVerificationUpdateInput, Prisma.llmVerificationUncheckedUpdateInput>;
};
export type llmVerificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelect<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
    where: Prisma.llmVerificationWhereUniqueInput;
};
export type llmVerificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.llmVerificationWhereInput;
    limit?: number;
};
export type llmVerificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.llmVerificationSelect<ExtArgs> | null;
    omit?: Prisma.llmVerificationOmit<ExtArgs> | null;
};
